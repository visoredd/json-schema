import React, { useState } from 'react';

interface Schema {
  [key: string]: {
    type: string;
  };
}

function App() {
  const [schema, setSchema] = useState<string>('');
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [generatedForm, setGeneratedForm] = useState<JSX.Element[] | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSchema(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedSchema: Schema = JSON.parse(schema);
      generateForm(parsedSchema);
    } catch (error) {
      alert('Invalid JSON Schema');
    }
  };

  const generateForm = (schema: Schema) => {
    const formFields: JSX.Element[] = Object.keys(schema).map((key) => {
      return (
        <div key={key}>
          <label htmlFor={key}>{key}</label>
          <input
            type={schema[key].type === 'string' ? 'text' : 'number'}
            id={key}
            name={key}
            value={formData[key]}
            onChange={(e) => handleFormChange(e, key)}
          />
        </div>
      );
    });
    setGeneratedForm(formFields);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setFormData({
      ...formData,
      [key]: e.target.value,
    });
  };

  const displayFormData = () => {
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',minWidth:"100vw",minHeight:"100vh" }}>
      <div style={{padding:20}}>
        <form onSubmit={handleSubmit}>
          <textarea
            value={schema}
            onChange={handleChange}
            placeholder="Enter JSON Schema here"
            style={{ width: '100%', height: '400px' }}
          />
          <button type="submit" style={{ marginTop: '10px' }}>
            Generate Form
          </button>
        </form>
      </div>
      <div style={{padding:20}}>
        <form>
          {generatedForm}
          <button type="button" onClick={displayFormData} style={{ marginTop: '10px' }}>
            Show Form Data
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
