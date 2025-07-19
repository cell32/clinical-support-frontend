
// SuggestedTreatment.tsx
import React, { useState } from 'react';
import TreatmentModal from './TreatmentModal';

interface Props {
  diagnoses: string[];
}

const SuggestedTreatment: React.FC<Props> = ({ diagnoses }) => {
  const [treatments, setTreatments] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/suggestedTreatment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ diagnosis: diagnoses }),
      });

      if (!response.ok) throw new Error('Failed to fetch treatment suggestions');

      const data = await response.json();
      let allTreatments: string[] = [];

      if (data.rules_based_treatment) {
        allTreatments = data.rules_based_treatment;
      } else if (data.ai_based_treatment) {
        allTreatments = data.ai_based_treatment.flatMap(
          (entry: { diagnosis: string; possible_treatments: string[] }) =>
            [`${entry.diagnosis}:`, ...entry.possible_treatments, '']
        );
      }

      setTreatments(allTreatments);
      setShowModal(true);
    } catch (err: any) {
      setTreatments([`Error: ${err.message}`]);
      setShowModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          padding: '10px',
          fontSize: '1rem',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        View Suggested Treatment
      </button>

      <TreatmentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        diagnoses={diagnoses}
        treatments={treatments}
      />
    </>
  );
};

export default SuggestedTreatment;
