module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
    
    Cart.associate = (models) => {
      console.log('Associating Cart with User and CartItem');
      Cart.belongsTo(models.User, { foreignKey: 'userId' });
      Cart.hasMany(models.CartItem, { foreignKey: 'cartId' });
    };

    return Cart;
  };