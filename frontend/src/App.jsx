import { useForm, Form } from 'react-hook-form';
import { useState } from 'react';

function App() {
  const { register, control, setValue } = useForm();
  const [thumbnails, setThumbnails] = useState([]);

  return (
    <div className="App">
      <h1>Image Upload Project</h1>
      <Form
        control={control}
        method="post"
        action="http://localhost:3000/uploads"
        onSuccess={async ({ response }) => {
          const thumbnail = await response.json();
          setThumbnails([thumbnail, ...thumbnails]);
        }}
      >
        <input hidden {...register('thumbnail')} type="file" />
        <input
          type="file"
          onChange={(e) => setValue('thumbnail', e.target.files[0])}
        />
        <input type="submit" value="upload your image" />
      </Form>

      {thumbnails.map((thumbnail, index) => (
        <div key={index}>
          <img src={`http://localhost:3000/uploads/${thumbnail.url}`} />
        </div>
      ))}
    </div>
  );
}

export default App;
