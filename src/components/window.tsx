type Props = {
  file: string;
  children: React.ReactNode;
  className?: string;
};

export function Window({ file, children, className = "" }: Props) {
  return (
    <div className={`window flex flex-col ${className}`}>
      <div className="window-bar">
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="ml-1 truncate">{file}</span>
      </div>
      {children}
    </div>
  );
}
