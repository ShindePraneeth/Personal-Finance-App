let users = [
    {
      id: "1",
      username: "john_doe",
      password: "password123",
      email: "john@example.com"
    },
    {
      id: "2",
      username: "jane_smith",
      password: "password456",
      email: "jane@example.com"
    }
  ];
  
  let transactions = [
    {
      id: "1",
      userId: "1",
      description: "Salary",
      category: "Income",
      amount: 5000,
      date: "2023-06-01"
    },
    {
      id: "2",
      userId: "1",
      description: "Rent",
      category: "Expense",
      amount: -1200,
      date: "2023-06-05"
    },
    {
      id: "3",
      userId: "1",
      description: "Groceries",
      category: "Expense",
      amount: -300,
      date: "2023-06-10"
    },
    {
      id: "4",
      userId: "2",
      description: "Freelance Project",
      category: "Income",
      amount: 1500,
      date: "2023-06-15"
    },
    {
      id: "5",
      userId: "2",
      description: "Utilities",
      category: "Expense",
      amount: -200,
      date: "2023-06-20"
    }
  ];
  
  const resolvers = {
    Query: {
      me: (_, __, { user }) => {
        if (!user) throw new Error('Not authenticated');
        return users.find(u => u.id === user.id);
      },
      getTransactions: (_, __, { user }) => {
        if (!user) throw new Error('Not authenticated');
        return transactions.filter(t => t.userId === user.id);
      },
    },
    Mutation: {
        login: async (_, { email, password }) => {
          try {
            console.log('Login attempt:', { email, password });
            const user = users.find(u => u.email === email);
            if (!user) {
              console.log('User not found');
              throw new Error('User not found');
            }
    
            if (user.password !== password) {
              console.log('Invalid password');
              throw new Error('Invalid password');
            }
    
            const token = Buffer.from(user.id).toString('base64');
            console.log('Login successful:', { userId: user.id, token });
            return { token, user };
          } catch (error) {
            console.error('Login error:', error);
            throw error;
          }
        },
      addTransaction: (_, { description, category, amount, date }, { user }) => {
        if (!user) throw new Error('Not authenticated');
  
        const newTransaction = {
          id: String(transactions.length + 1),
          userId: user.id,
          description,
          category,
          amount: category === 'Expense' ? -Math.abs(amount) : Math.abs(amount),
          date,
        };
        transactions.push(newTransaction);
        return newTransaction;
      },
    },
  };
  
  module.exports = { resolvers };