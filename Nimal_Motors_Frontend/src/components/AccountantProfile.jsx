// src/components/AccountantProfile.jsx
import React from "react";

const AccountantProfile = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Accountant Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl mb-4">John Doe</h2>
        <p className="mb-2"><strong>Position:</strong> Accountant</p>
        <p className="mb-2"><strong>Email:</strong> john.doe@example.com</p>
        <p className="mb-4"><strong>Responsibilities:</strong> Managing inventory, generating reports, and overseeing financial transactions.</p>
      </div>
    </div>
  );
};

export default AccountantProfile;
