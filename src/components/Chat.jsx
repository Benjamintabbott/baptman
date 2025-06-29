import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import EmojiPicker from 'emoji-picker-react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const BAPTMAN_COIN_ADDRESS = '0xe9c6ae7a056ba49901fcc19ab3fcff0938f882cfd7f2cc5a72eea362d29f5b8f';

async function checkTokenBalance(address) {
  const endpoint = 'https://indexer.mainnet.aptoslabs.com/v1/graphql';

  const query = `
    query GetFungibleAssetBalances($address: String, $offset: Int) {
      current_fungible_asset_balances(
        where: { owner_address: { _eq: $address } },
        offset: $offset,
        limit: 100,
        order_by: { amount: desc }
      ) {
        asset_type
        amount
      }
    }
  `;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { address, offset: 0 } }),
    });

    if (!res.ok) throw new Error('Indexer query failed');

    const json = await res.json();

    if (json.errors) {
      console.error('GraphQL errors:', json.errors);
      return false;
    }

    const balances = json.data.current_fungible_asset_balances;

    const baptmanBalance = balances.find((b) =>
      b.asset_type.includes(BAPTMAN_COIN_ADDRESS)
    );

    return baptmanBalance && Number(baptmanBalance.amount) > 0;
  } catch (error) {
    console.error('Error checking Baptman token balance:', error);
    return false;
  }
}

function truncate(address) {
  if (!address) return '';
  const str = address.toString();
  return str.slice(0, 6) + '...' + str.slice(-4);
}

export default function Chat() {
  const { connected, account } = useWallet();
  const [isMobile, setIsMobile] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1000);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check Baptman token ownership on connect/account change
  useEffect(() => {
    if (connected && account?.address) {
      checkTokenBalance(account.address.toString()).then(setHasAccess);
    } else {
      setHasAccess(false);
    }
  }, [connected, account]);

  // Fetch initial messages and subscribe to realtime inserts
  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel('realtime:messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Auto scroll chat to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch messages ordered by created_at ascending
  async function fetchMessages() {
    const { data, error } = await supabase
      .from('messages')
      .select('content, username, type')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Fetch error:', error);
      setMessages([]);
      return;
    }

    setMessages(data || []);
  }

  // Send new chat message if connected and has token
  async function sendMessage() {
    if (!newMessage.trim()) return;
    if (!connected || !hasAccess) return;

    const username = truncate(account.address.toString());

    const { data, error } = await supabase
      .from('messages')
      .insert([{ content: newMessage, type: 'text', username }])
      .select();

    if (error) {
      console.error('Send error:', error);
      return;
    }

    if (data) {
      setMessages((prev) => [...prev, ...data]);
      setNewMessage('');
    }
  }

  // Add emoji to message
  function onEmojiClick(emojiData) {
    if (!connected || !hasAccess) return;
    setNewMessage((prev) => prev + emojiData.emoji);
  }

  // Placeholder & disabled logic
  let inputPlaceholder = 'Connect wallet to chat';
  let inputDisabled = true;
  if (connected && !hasAccess) {
    inputPlaceholder = 'You must hold Baptman tokens to chat';
  } else if (connected && hasAccess) {
    inputPlaceholder = 'Type a message...';
    inputDisabled = false;
  }

  return (
    <section
      style={{
        width: '90%',
        height: '100%',
        padding: '20px',
        borderRadius: '12px',
        color: 'white',
        fontFamily: '"Trebuchet MS", sans-serif',
        alignItems: 'center',
      }}
    >
      <h2 style={{ textAlign: 'center', fontSize: '3.5rem', marginBottom: '10px', fontFamily: 'Impact, sans-serif', }}>
        Community Chat
      </h2>

      <div
        style={{
          height: '500px',
          overflowY: 'auto',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '8px',
          padding: '10px',
          marginBottom: '12px',
        }}
      >
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <span style={{ color: '#00fff2', fontWeight: 'bold' }}>{msg.username}:</span>{' '}
            <span>{msg.content}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          disabled={inputDisabled}
          style={{
            fontSize: '20px',
            background: 'transparent',
            border: 'none',
            cursor: inputDisabled ? 'not-allowed' : 'pointer',
            color: '#fff',
          }}
          aria-label="Toggle emoji picker"
        >
          😊
        </button>

        <input
          type="text"
          placeholder={inputPlaceholder}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          disabled={inputDisabled}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid rgba(255,255,255,0.2)',
            backgroundColor: inputDisabled ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
            color: 'white',
            fontFamily: '"Trebuchet MS", sans-serif',
            cursor: inputDisabled ? 'not-allowed' : 'text',
          }}
          aria-label="Message input"
        />

        <button
          onClick={sendMessage}
          disabled={inputDisabled}
          style={{
            padding: '10px 14px',
            borderRadius: '6px',
            backgroundColor: inputDisabled ? '#555' : '#8000ff',
            color: 'white',
            border: 'none',
            cursor: inputDisabled ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            boxShadow: inputDisabled ? 'none' : '0 0 10px #8000ff',
          }}
          aria-label="Send message"
        >
          Send
        </button>
      </div>

      {showEmojiPicker && (
        <div style={{ marginTop: '12px' }}>
          <EmojiPicker theme="dark" onEmojiClick={onEmojiClick} />
        </div>
      )}
    </section>
  );
}
