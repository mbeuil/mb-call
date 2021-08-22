import { Archive } from '@/icons';
import { changeCallState } from '@/utils';

interface ArchiveButtonProps {
  id?: string;
  onClick: () => void;
}

function ArchiveButton({ id = '', onClick }: ArchiveButtonProps): JSX.Element {
  const handleClick = (): void => {
    onClick();
    changeCallState({ id });
  };

  return (
    <button className="rounded-sm w-9 h-9 bg-opGreen" onClick={handleClick}>
      <Archive className="m-auto w-7 h-7 text-green" />
    </button>
  );
}

export default ArchiveButton;
