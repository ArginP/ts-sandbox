type Pizza = {
    id: number
    name: string
    price: number
}

type Order = {
    orderId: number
    pizza: Pizza
    status: "ordered" | "completed"
}

let nextNewPizzaId: number = 1
let nextOrderId: number  = 1
let cashInRegisters: number  = 100
const orderQueue: Order[] = []

function setPizzaId(): number {
    const pizzaId = nextNewPizzaId;
    nextNewPizzaId++;
    return pizzaId
}

const menu: Pizza[] = [
    { id: setPizzaId(), name: "Margherita", price: 8 },
    { id: setPizzaId(), name: "Pepperoni", price: 10 },
    { id: setPizzaId(), name: "Hawaiian", price: 25 },
    { id: setPizzaId(), name: "Veggie", price: 9 },
]

function addToArray<T>(array: T[], item: T): T[] {
    array.push(item)
    return array
}

function addNewPizza (pizza: Omit<Pizza, "id">): Pizza {
    const newPizza: Pizza = { id: setPizzaId(), ...pizza };
    menu.push(newPizza)
    return newPizza
}

function placeOrder (pizzaName: string): Order | undefined {
    const orderedPizza: Pizza | undefined = menu.find(pizza => pizza.name === pizzaName)
    let newOrder: Order
    if (orderedPizza) {
        newOrder = {
            orderId: nextOrderId,
            pizza: orderedPizza,
            status: "ordered",
        }
        orderQueue.push(newOrder)
        cashInRegisters += orderedPizza.price
        nextOrderId++
    } else {
        console.error("Pizza not found")
        return undefined
    }
    return newOrder
}

addToArray<Pizza>(menu, {id: setPizzaId(), name: "Chicken Bacon Ranch", price: 12 })
addToArray<Order>(orderQueue, { orderId: nextOrderId++, pizza: menu[3], status: "completed" })

console.log(menu)
console.log(orderQueue)

function completeOrder (orderId: number): Order | undefined {
    const newOrder = orderQueue.find(order => order.orderId === orderId)
    if (newOrder) {
        newOrder.status = "completed"
        return newOrder
    } else {
        console.error("Order not found")
        return undefined
    }
}

function getPizzaDetails (identifier: number | string): Pizza | undefined {
    let pizzaDetails: Pizza | undefined
    if (typeof identifier === "string") {
        pizzaDetails = menu.find(pizza => pizza.name.toLowerCase() === identifier.toLowerCase().trim())
        if (pizzaDetails) {
            return pizzaDetails
        } else {
            console.error("Pizza not found")
            return undefined
        }
    } else if (typeof identifier === "number") {
        pizzaDetails = menu.find(pizza => pizza.id === identifier)
        if (pizzaDetails) {
            return pizzaDetails
        } else {
            console.error("Pizza not found")
            return undefined
        }
    } else {
        console.error("Parameter 'identifier' must be either a string or a number")
    }
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({ name: "BBQ Chicken", price: 12 })
addNewPizza({ name: "Spicy Sausage", price: 11 })

placeOrder("Chicken Bacon Ranch")
completeOrder(1)

console.log("Menu: ", menu)
console.log("Cash: ", cashInRegisters)
console.log("Order queue: ", orderQueue)
console.log(getPizzaDetails(2))
