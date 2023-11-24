import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  useGetAdminDataQuery,
  useAddTermsDataMutation
} from "../../../redux/adminApi";

const CKEditorComponent = ({ onChange, value }) => {

  const { data, isError, isLoading } = useGetAdminDataQuery();
  const [addAdminData] = useAddTermsDataMutation();

  const handleSubmit = async () => {
    const termsData = value;
    const res = await addAdminData({ termsData });
 
  };

  return (
    <main>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        style={{ height: "200px" }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
      <button className="btn btn-primary my-3" onClick={handleSubmit}>
        Submit
      </button>

      {/* This is how you should show the html content into frontend */}
      {/* {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading content</p>
      ) : (
        <div>
          <h3>Testing Html Content from Server &#8675;:</h3>
          <div dangerouslySetInnerHTML={{ __html: resData || "" }} />
        </div>
      )} */}
    </main>
  );
};

export default CKEditorComponent;
