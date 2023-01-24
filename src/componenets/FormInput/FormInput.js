import React from 'react';

const FormInput = ({input, value, handleChange}) => {
    const { name, label, errorMsg } = input;
    
    return (
        <div className='grid grid-cols-3 gap-x-6'>
            <label>{label}</label>
            <div className='col-span-2'>
                <div className='flex justify-between'>
                    <input className='w-11/12'
                        name={name}  
                        value={value}
                        type={input?.type}
                        min={input?.min}
                        onChange={handleChange}
                        
                    />
                    <span className='font-medium'>{input?.unit}</span>
                </div>
                <span className='block text-sm font-normal text-sky-500'>
                        {errorMsg}
                </span>
            </div>
            
        </div>
    );
};

export default FormInput;