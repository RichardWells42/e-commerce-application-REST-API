module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    });
    return Order;
  };