import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getIncome(): number {
    return this.transactions.reduce((sum: number, transaction: Transaction) => {
      return transaction.type === 'income' ? sum + transaction.value : sum;
    }, 0);
  }

  public getOutcome(): number {
    return this.transactions.reduce((sum: number, transaction: Transaction) => {
      return transaction.type === 'outcome' ? sum + transaction.value : sum;
    }, 0);
  }

  public getBalance(): Balance {
    const income = this.getIncome();
    const outcome = this.getOutcome();

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
