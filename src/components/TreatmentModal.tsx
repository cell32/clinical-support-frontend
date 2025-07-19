
// TreatmentModal.tsx
import React from 'react';

interface TreatmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  diagnoses: string[];
  treatments: string[];
}

const TreatmentModal: React.FC<TreatmentModalProps> = ({
  isOpen,
  onClose,
  diagnoses,
  treatments,
}) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: '300px',
      zIndex: 999
    }}>
      <div style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '10px',
        width: '90%',
        maxWidth: '500px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
        marginBottom: '13rem'
      }}>
        <p style={{color: 'red'}}>Consult a doctor before starting any treatment </p>        
        <h2>Suggested Treatments For:</h2>

        <ul>
          {diagnoses.map((d, idx) => (
            <li key={idx}>{d}</li>
          ))}
        </ul>
        <p><strong>Treatments:</strong></p>
        <ul>
          {treatments
            .filter(t => t?.trim()) // Removes empty strings, null, undefined
            .map((t, idx) => (
              <li key={idx}>{t}</li>
            ))}
        </ul>
        <button onClick={onClose} style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TreatmentModal;
