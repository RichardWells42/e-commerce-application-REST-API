module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define('CartItem', {
      cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
    CartItem.associate = (models) => {
      console.log('Associating CartItem with Cart and Product');
      CartItem.belongsTo(models.Cart, { foreignKey: 'cartId' });
      CartItem.belongsTo(models.Product, { foreignKey: 'productId' });
    };
    return CartItem;
  };