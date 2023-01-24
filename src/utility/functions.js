const getCurrentDate = () => {
    const date = new Date();
    const YYYY = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? `0${MM}` : MM;
    let DD = date.getDate();
    DD = DD < 10 ? `0${DD}` : DD;
    let hh = date.getHours();
    hh = hh < 10 ? `0${hh}` : hh;
    let mm = date.getMinutes();
    mm = mm < 10 ? `0${mm}` : mm;
    const currentDate = `${YYYY}-${MM}-${DD}T${hh}:${mm}`;

    return currentDate;
}

const checkingRushHour = dateAndTime => {
    const [yearStr, monthStr, dateStr, hourStr, minuteStr] = dateAndTime.split(/[-T:]+/);
    const hour = parseInt(hourStr);
    return (hour >= 15 && hour <= 18) ? true : false;
}

const formValidate = values => {
    const errors = {};

    if (!values.cartValue || parseInt(values.cartValue) === 0) {
        errors.cartValue = 'Cart value is required';
    } else if (!values.cartValue.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) {
        errors.cartValue = 'Only numbers or decimals';
    }

    if (!values.deliveryDistance || parseInt(values.deliveryDistance) === 0) {
        errors.deliveryDistance = 'Delivery distance is required';
    } else if (!values.deliveryDistance.match(/^\d+$/)) {
        errors.deliveryDistance = 'Decimal or letter not allowed';
    }
    
    if (!values.numberOfItems || parseInt(values.numberOfItems) === 0) {
        errors.numberOfItems = 'Number of items is required';
    } else if (!values.numberOfItems.match(/^\d+$/)) {
        errors.numberOfItems = 'Decimal or letter not allowed';
    }

    const [inputYear, inputMonth, inputDay, inputHour, inputMinute] = values.dateAndTime.split(/[-T:]+/);
    const [currentYear, currentMonth, currentDay, currentHour, currentMinute] = getCurrentDate().split(/[-T:]+/);

    if (!values.dateAndTime) {
        errors.dateAndTime = 'Date and time is required';
    }
    if (parseInt(inputYear) < parseInt(currentYear)) {
        errors.dateAndTime = 'Year is not correct';
    }

    if (parseInt(inputYear) === parseInt(currentYear)) {
        if (parseInt(inputMonth) < parseInt(currentMonth)) {
            errors.dateAndTime = 'Month is not correct';

        } else if (parseInt(inputMonth) === parseInt(currentMonth)) {
            if (parseInt(inputDay) < parseInt(currentDay)) {
                errors.dateAndTime = 'Date is not correct';

            } else if (parseInt(inputDay) === parseInt(currentDay)) {
                if (parseInt(inputHour) < parseInt(currentHour)) {
                    errors.dateAndTime = 'Hour is not correct';

                } else if (parseInt(inputHour) === parseInt(currentHour)) {
                    if (parseInt(inputMinute) < parseInt(currentMinute)) {
                        errors.dateAndTime = 'Minute is not correct';
                    }
                }
            }
        }
    }

    return errors;
}

const getAllInputValues = values => {
    const cartValue = parseFloat(values.cartValue);
    const deliveryDistance = parseInt(values.deliveryDistance);
    const numberOfItems = parseInt(values.numberOfItems);
    const dateAndTime = values.dateAndTime;
    console.log(typeof dateAndTime);

    return [cartValue, deliveryDistance, numberOfItems, dateAndTime];
}

const surChargeCalculation = cartValue => {
    const surCharge = cartValue < 10 ? (10 - cartValue) : 0;
    return surCharge;
}

const distanceCostCalculation = deliveryDistance => {
    const minimumDeliveryDistanceCost = 2;

    if (deliveryDistance <= 1000) {
        return minimumDeliveryDistanceCost;
    } else {
        const remainingDistance = deliveryDistance - 1000;
        const costRatioForRemainingDistance = Math.ceil(remainingDistance / 500); 
        const deliveryDistanceCost = minimumDeliveryDistanceCost + (costRatioForRemainingDistance * 1);

        return deliveryDistanceCost;

    }
}

const itemNumbersCostCalculation = numberOfItems => {
    const extraItemsAboveFour = numberOfItems - 4;
    return numberOfItems <= 4 ? 0 : (numberOfItems <= 12 ? extraItemsAboveFour * 0.5 : extraItemsAboveFour * 0.5 + 1.2);
}

const totalDeliveryFeeCalculation = (surCharge, deliveryDistanceCost, additionalCostBasedOnItemNumbers, cartValue, ifRushHour) => {
    const deliveryFee = surCharge + deliveryDistanceCost + additionalCostBasedOnItemNumbers;
    let totalDeliveryFee = ifRushHour ? deliveryFee * 1.2 : deliveryFee;

    return cartValue >= 100 ? 0 : (totalDeliveryFee > 15 ? 15 : totalDeliveryFee);
}

export { 
    getCurrentDate,
    checkingRushHour,
    formValidate,
    getAllInputValues,
    surChargeCalculation, 
    distanceCostCalculation, 
    itemNumbersCostCalculation,
    totalDeliveryFeeCalculation
};