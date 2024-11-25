module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
    });
  
    Order.associate = (models) => {
      Order.belongsTo(models.User, { foreignKey: 'userId' });
      Order.hasMany(models.OrderItem, { foreignKey: 'orderId' });
    };
  
    return Order;
  }; 

// module.exports = (sequelize, DataTypes) => {
//     const Order = sequelize.define('Order', {
//       userId: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//       },
//       totalAmount: {
//         type: DataTypes.FLOAT,
//         allowNull: false
//       }
//     });
//     return Order;
//   };