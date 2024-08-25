//Strategy pattern example use case

interface PaymentStrategy {
  execute(amount: number): void;
}

class PaypalPayment implements PaymentStrategy {
  execute(amount: number): void {
    try {
      // Simulate PayPal logic (i.e., calling PayPal API, saving to DB, etc.)
      console.log(`Processing PayPal payment of ${amount}`);
    } catch (error) {
      console.error("Failed to process PayPal payment", error);
    }
  }
}

class VisaPayment implements PaymentStrategy {
  execute(amount: number): void {
    try {
      console.log(`Processing Visa payment of ${amount}`);
    } catch (error) {
      console.error("Failed to process Visa payment", error);
    }
  }
}

class MastercardPayment implements PaymentStrategy {
  execute(amount: number): void {
    try {
      console.log(`Processing Mastercard payment of ${amount}`);
    } catch (error) {
      console.error("Failed to process Mastercard payment", error);
    }
  }
}

class PaymentHandler {
  _strategy: PaymentStrategy | null = null;

  public set strategy(strategy: PaymentStrategy) {
    this._strategy = strategy;
  }

  handlePayment(amount: number) {
    if (!this._strategy) {
      console.error("No strategy configured");
      return;
    }
    console.log(`Executing ${this._strategy.constructor.name}`);
    this._strategy.execute(amount);
  }
}

const STRATEGY_MAP: Record<string, new () => PaymentStrategy> = {
  paypal: PaypalPayment,
  visa: VisaPayment,
  mastercard: MastercardPayment,
};

if (require.main === module) {
  const choices = ["paypal", "visa", "mastercard"];
  // Let say the customer will choose between PayPal, Visa and Mastercard
  const chosenPayment = choices[Math.floor(Math.random() * choices.length)];
  // Initialize the payment handler
  const handler = new PaymentHandler();
  // Set the chosen payment strategy
  handler.strategy = new STRATEGY_MAP[chosenPayment]();
  // Handle the payment
  handler.handlePayment(2000);
}
