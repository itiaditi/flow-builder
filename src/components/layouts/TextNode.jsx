import React from "react";
import { Handle, Position } from "reactflow";
import {IconMessageCircleFilled} from '@tabler/icons-react';
function TextNode({ data, selected }) {
  return (
    <div style={{ position: 'relative' }}>
      {/* Input handle */}
      <Handle 
        type="target" 
        position={Position.Left} 
        style={{ 
          background: '#555',
          border: '2px solid #fff',
          width: '8px',
          height: '8px',
          left:'-6px',
          zIndex:2
        }}
      />
      
      {/* WhatsApp-style message bubble */}
      <div style={{
        backgroundColor: '#d1f7c4', // WhatsApp green color
        borderRadius: '8px',
        
        maxWidth: '400px',
        minWidth: '250px',
        position: 'relative',
        border: selected ? '2px solid #0ea5e9' : '1px solid #c3f0ca',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '14px',
        lineHeight: '1.4',
        color: '#1f2937',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}>
        {/* Message header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '8px',
          gap: '8px',
           padding:'0px 12px 0px 12px'
        }}>
          <IconMessageCircleFilled color={"green"}/>
          <span style={{
            fontSize: '12px',
            fontWeight: '600',
            color: 'black',
           
          }}>
           {data.title?data.title: `Send Message`}
          </span>
          <div style={{
            marginLeft: 'auto',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#10b981'
          }} />
        </div>
        
        {/* Message content */}
        <div style={{
          fontSize: '14px',
          color: '#374151',
          wordBreak: 'break-word',
          background:'white',
          padding: '10px',
          borderRadius:'8px'
        }}>
          {data.text || 'New message'}
        </div>
        
      
        
        {/* Message tail (speech bubble pointer) */}
       
      </div>
      
      {/* Output handle */}
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{ 
          background: '#555',
          border: '2px solid #fff',
          width: '8px',
          height: '8px',
         
        }}
      />
    </div>
  );
}

export default TextNode;