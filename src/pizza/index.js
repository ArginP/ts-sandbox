var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var nextNewPizzaId = 1;
var nextOrderId = 1;
var cashInRegisters = 100;
var orderQueue = [];
function setPizzaId() {
    var pizzaId = nextNewPizzaId;
    nextNewPizzaId++;
    return pizzaId;
}
var menu = [
    { id: setPizzaId(), name: "Margherita", price: 8 },
    { id: setPizzaId(), name: "Pepperoni", price: 10 },
    { id: setPizzaId(), name: "Hawaiian", price: 25 },
    { id: setPizzaId(), name: "Veggie", price: 9 },
];
function addToArray(array, item) {
    array.push(item);
    return array;
}
function addNewPizza(pizza) {
    var newPizza = __assign({ id: setPizzaId() }, pizza);
    menu.push(newPizza);
    return newPizza;
}
function placeOrder(pizzaName) {
    var orderedPizza = menu.find(function (pizza) { return pizza.name === pizzaName; });
    var newOrder;
    if (orderedPizza) {
        newOrder = {
            orderId: nextOrderId,
            pizza: orderedPizza,
            status: "ordered",
        };
        orderQueue.push(newOrder);
        cashInRegisters += orderedPizza.price;
        nextOrderId++;
    }
    else {
        console.error("Pizza not found");
        return undefined;
    }
    return newOrder;
}
addToArray(menu, { id: setPizzaId(), name: "Chicken Bacon Ranch", price: 12 });
addToArray(orderQueue, { orderId: nextOrderId++, pizza: menu[3], status: "completed" });
console.log(menu);
console.log(orderQueue);
function completeOrder(orderId) {
    var newOrder = orderQueue.find(function (order) { return order.orderId === orderId; });
    if (newOrder) {
        newOrder.status = "completed";
        return newOrder;
    }
    else {
        console.error("Order not found");
        return undefined;
    }
}
function getPizzaDetails(identifier) {
    var pizzaDetails;
    if (typeof identifier === "string") {
        pizzaDetails = menu.find(function (pizza) { return pizza.name.toLowerCase() === identifier.toLowerCase().trim(); });
        if (pizzaDetails) {
            return pizzaDetails;
        }
        else {
            console.error("Pizza not found");
            return undefined;
        }
    }
    else if (typeof identifier === "number") {
        pizzaDetails = menu.find(function (pizza) { return pizza.id === identifier; });
        if (pizzaDetails) {
            return pizzaDetails;
        }
        else {
            console.error("Pizza not found");
            return undefined;
        }
    }
    else {
        console.error("Parameter 'identifier' must be either a string or a number");
    }
}
addNewPizza({ name: "Chicken Bacon Ranch", price: 12 });
addNewPizza({ name: "BBQ Chicken", price: 12 });
addNewPizza({ name: "Spicy Sausage", price: 11 });
placeOrder("Chicken Bacon Ranch");
completeOrder(1);
console.log("Menu: ", menu);
console.log("Cash: ", cashInRegisters);
console.log("Order queue: ", orderQueue);
console.log(getPizzaDetails(2));
