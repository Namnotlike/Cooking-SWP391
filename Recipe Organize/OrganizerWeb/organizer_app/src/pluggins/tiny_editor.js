import { Editor } from '@tinymce/tinymce-react'; //npm install --save @tinymce/tinymce-react
export default function TinyEditor({handleEditorChange,content}) {
  
  return (
    <Editor
      apiKey="kxsudwcx2lt1bu5venix4uqe8zpaohrwk4z04dvlqarbw2n7"
      initialValue={content && content.length>0 && content || ""}
      init={{
        selector: 'textarea',
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        auto_focus: true
      }}
      onEditorChange={handleEditorChange}
    />
  );
}