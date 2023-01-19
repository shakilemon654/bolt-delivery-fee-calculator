import React, { useState } from 'react';
import { distanceCostCalculation, finalDeliveryFeeCalculation, itemNumbersCostCalculation, surChargeCalculation } from '../../utility/functions';

const Calculator = () => {
    const initialFormValues = { cartValue: '', deliveryDistance: '', numberOfItems: ''};
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState({});
    const [deliveryFee, setDeliverFee] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(formValidate(formValues));

        if (Object.keys(formErrors).length === 0) {
            const cartValue = parseFloat(formValues.cartValue);
            const deliveryDistance = parseInt(formValues.deliveryDistance);
            const numberOfItems = parseInt(formValues.numberOfItems);
            

            const surCharge = surChargeCalculation(cartValue);
            const deliveryDistanceCost = distanceCostCalculation(deliveryDistance);
            const additionalCostBasedOnItemNumbers = itemNumbersCostCalculation(numberOfItems);

            const totalDeliveryFee = finalDeliveryFeeCalculation(surCharge, deliveryDistanceCost, additionalCostBasedOnItemNumbers, cartValue);
            setDeliverFee(totalDeliveryFee);
        }
    }

    const formValidate = values => {
        const errors = {};
    
        if (!values.cartValue.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) {
            errors.cartValue = 'Only numbers or decimals';
        }
        if (!values.deliveryDistance.match(/^[0-9\b]+$/)) {
            errors.deliveryDistance = 'Only full numbers';
        }
        if (!values.numberOfItems.match(/^[0-9\b]+$/)) {
            errors.numberOfItems = 'Only full numbers';
        }

        return errors;
    }

    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <h3>Bolt Delivery Fee Calculator</h3>

            <form className='grid grid-cols-2 gap-4 mt-8'>
                <label>Cart value</label>
                <div>
                    <input 
                        name='cartValue'
                        value={formValues.cartValue}
                        onChange={handleChange}
                    />
                    <p className='text-red-500'>{formErrors.cartValue}</p>
                </div>
            
                <label>Delivery distance</label>
                <div>
                    <input 
                        name='deliveryDistance'
                        value={formValues.deliveryDistance}
                        onChange={handleChange}
                    />
                    <p className='text-red-500'>{formErrors.deliveryDistance}</p>
                </div>
            
                <label>Number of items</label>
                <div>
                    <input 
                        name='numberOfItems'
                        value={formValues.numberOfItems}
                        onChange={handleChange}
                    />
                    <p className='text-red-500'>{formErrors.numberOfItems}</p>
                </div>
                <div className='col-span-2 flex justify-center items-center mt-4'>
                    <button 
                        className='bg-green-500 p-2
                        text-white font-semibold tracking-wider
                        rounded'
                        onClick={handleSubmit}
                    >
                        Calculate delivery fee
                    </button>
                </div>
            </form>
            <span className='mt-4'>Delivery fee: {deliveryFee.toFixed(2)}</span>
        </div>
    );
};

export default Calculator;