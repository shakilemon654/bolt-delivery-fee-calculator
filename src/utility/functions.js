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

const finalDeliveryFeeCalculation = (surCharge, deliveryDistanceCost, additionalCostBasedOnItemNumbers, cartValue) => {
    let totalDeliveryFee = surCharge + deliveryDistanceCost + additionalCostBasedOnItemNumbers;
    console.log('surcharge', surCharge);
    console.log(deliveryDistanceCost);
    console.log(additionalCostBasedOnItemNumbers);

    return cartValue > 100 ? 0 : (totalDeliveryFee > 15 ? 15 : totalDeliveryFee);
}

export { 
    surChargeCalculation, 
    distanceCostCalculation, 
    itemNumbersCostCalculation,
    finalDeliveryFeeCalculation
};