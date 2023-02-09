import React, { useEffect, useState } from 'react';
import { 
    distanceCostCalculation, 
    totalDeliveryFeeCalculation, 
    formValidate, 
    getCurrentDate, 
    itemNumbersCostCalculation, 
    surChargeCalculation, 
    checkingRushHour,
    getAllInputValues

} from '../../utility/functions';

import './Calculator.css';
import FormInput from '../FormInput/FormInput';

const Calculator = () => {
    const [values, setValues] = useState({
        cartValue: '', 
        deliveryDistance: '', 
        numberOfItems: '', 
        dateAndTime: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [deliveryFee, setDeliveryFee] = useState('');

    const inputs = [
        {   
            id: 1,
            name: 'cartValue',
            label: 'Cart value',
            unit: '€',
            errorMsg: formErrors?.cartValue
        },
        {   
            id: 2,
            name: 'deliveryDistance',
            label: 'Delivery distance',
            unit: 'm',
            errorMsg: formErrors?.deliveryDistance
        },
        {   
            id: 3,
            name: 'numberOfItems',
            label: 'Number of items',
            errorMsg: formErrors?.numberOfItems
        },
        {   
            id: 4,
            name: 'dateAndTime',
            label: 'Date & time',
            type:'datetime-local',
            min: getCurrentDate(),
            errorMsg: formErrors?.dateAndTime
        }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({...values, [name]: value});
    }

    useEffect(() => {
        setFormErrors(formValidate(values));
        setDeliveryFee('');
    }, [values])

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = formValidate(values);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            const [cartValue, deliveryDistance, numberOfItems, dateAndTime] = getAllInputValues(values);
            
            const surCharge = surChargeCalculation(cartValue);
            const deliveryDistanceCost = distanceCostCalculation(deliveryDistance);
            const additionalCostBasedOnItemNumbers = itemNumbersCostCalculation(numberOfItems);
            const ifRushHour = checkingRushHour(dateAndTime);

            // console.log('surCharge', surCharge);
            // console.log('deliveryDistanceCost', deliveryDistanceCost);
            // console.log('number of items cost', additionalCostBasedOnItemNumbers);

            const totalDeliveryFee = totalDeliveryFeeCalculation(surCharge, deliveryDistanceCost, additionalCostBasedOnItemNumbers, cartValue, ifRushHour);
            setDeliveryFee(totalDeliveryFee.toFixed(2));
        }
        else {
            setDeliveryFee('');
        }
    }

    return (
        <div className='w-full flex flex-col items-center p-4'>
            <h3 className='mt-8 mb-12 font-bold text-xl text-blue-400'>Wolt Delivery Fee Calculator</h3>

            <div>
                <form className='grid grid-cols-1 gap-y-4'>
                    {
                        inputs.map(input => <FormInput 
                            key={input.id} 
                            input={input} 
                            value={values[input.name]} 
                            handleChange={handleChange}
                            />
                        )
                    }
                    <button className='btn bg-blue-400' onClick={handleSubmit}>
                        Calculate delivery fee
                    </button>
                </form>
                <p className='mt-4 text-center btn bg-orange-400'>
                    Delivery fee: {deliveryFee}€
                </p>
            </div>
        </div>
    );
};

export default Calculator;