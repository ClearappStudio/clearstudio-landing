export function MailMark({ className = "" }: { className?: string }) {
  return (
    <span className={`mail-mark ${className}`.trim()} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}
