"use client";

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default function MarkReadButton({ action }: { action: () => Promise<void> }) {
  return (
    <form action={action}>
      <button
        type="submit"
        className="admin-btn admin-btn-icon"
        style={{ color: "#16a34a" }}
        title="Tandai sudah dibaca"
      >
        <CheckIcon />
      </button>
    </form>
  );
}
