import React, { useState } from 'react';
import CKEditorComponent from './CKEditorComponent';
import './Contents.css';

const Contents = () => {
  const [content, setContent] = useState('');

  return (
    <div className="contents-container">
      <h2 className='mt-3'>Admin Page Content</h2>
      <div className="editor-container">
         <CKEditorComponent
        value={content}
        onChange={(newContent) => setContent(newContent)}
      />
      </div>
     
    </div>
  );
};

export default Contents;
