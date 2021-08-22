import * as React from 'react';
// import { useI18n } from 'next-localization';

import { Note } from '@/types';

function NoteEntry({ content }: Note): JSX.Element {
  return <p className="p-5 rounded-sm bg-opGreen text-primary">{content}</p>;
}

interface NoteScreenProps {
  notes: Note[] | undefined;
}

function NoteScreen({ notes = [] }: NoteScreenProps): JSX.Element {
  //   const i18n = useI18n();
  //   const [input, setInput] = React.useState('');

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
  //     setInput(e.target.value);

  return (
    <div className="flex flex-col w-full max-w-md p-5 border rounded-sm border-primary min-h-[466px]">
      <ul className="flex flex-col h-full gap-5 mb-5">
        {notes.map((note) => (
          <NoteEntry key={note.id} {...note} />
        ))}
      </ul>
      {/* <input
        aria-label={i18n.t('call_page.note_input')}
        title={i18n.t('call_page.note_input')}
        className="h-8 px-5 mt-auto bg-transparent border rounded-sm border-green"
        placeholder="note"
        value={input}
        onChange={handleChange}
      /> */}
    </div>
  );
}

export default NoteScreen;
