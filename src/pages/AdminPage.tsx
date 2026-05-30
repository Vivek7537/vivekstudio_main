import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPanel from '../components/AdminPanel';

export default function AdminPage() {
  const navigate = useNavigate();
  const [isAdminOpen] = useState(true);

  return (
    <div>
      <AdminPanel 
        isOpen={isAdminOpen} 
        setIsOpen={(isOpen) => {
          if (!isOpen) {
            navigate('/');
          }
        }} 
        initialTab="hero"
      />
    </div>
  );
}
