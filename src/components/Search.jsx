import React, { useState } from 'react'
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import './search.scss'

export default function Search({ onSearch,  }) {
  const [query, setQuery] = useState('');

  const handleInputChange = async (event) => {
    const { value } = event.target;
    setQuery(value);

  
    if (value.length >= 3) {
      await onSearch(value); 
    } else if (value.length === 0) {
      await onSearch(''); 
    }
  };

 

  return (
    <div className='search'>
      <div className="search-wrapper">
        <IconField iconPosition="right" className='search-input-icon'>
          <InputIcon className="pi pi-search"> </InputIcon>
          <InputText
            placeholder="Search"
            className='search-input'
            value={query}
            onChange={handleInputChange}
          />
        </IconField>

       
      </div>

    </div>
  )
}
