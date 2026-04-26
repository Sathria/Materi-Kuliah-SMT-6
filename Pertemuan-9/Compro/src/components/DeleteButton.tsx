"use client";

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);

interface DeleteButtonProps {
  action: () => Promise<void>;
  message?: string;
}

export default function DeleteButton({ action, message = "Apakah Anda yakin ingin menghapus item ini?" }: DeleteButtonProps) {
  return (
    <form action={action}>
      <button
        type="submit"
        className="admin-btn admin-btn-icon"
        style={{ color: "#ef4444" }}
        title="Hapus"
        onClick={(e) => {
          if (!confirm(message)) e.preventDefault();
        }}
      >
        <TrashIcon />
      </button>
    </form>
  );
}
