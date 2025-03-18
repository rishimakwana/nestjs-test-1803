import { Sequelize } from 'sequelize-typescript';
import configuration from 'src/config/configuration';
import { Order } from 'src/models/order.entity';
import { OrderHistory } from 'src/models/orderHistory.entity';
import { Product } from 'src/models/product.entity';
import { ProductInventory } from 'src/models/productInventory.entity';
import { RoleMst } from 'src/models/roleMst.entity';
import { Store } from 'src/models/store.entity';
import { User } from 'src/models/user.entity';
import { UserRoles } from 'src/models/userRoles.entity';

const config = configuration();

export const sequelize = new Sequelize({
    database: config.db.database,
    username: config.db.username,
    password: config.db.dbPassword,
    host: config.db.host,
    port: config.db.port,
    dialect: 'mysql',
    models: [User, RoleMst, UserRoles, Order, Product, Store, OrderHistory, ProductInventory]
});
