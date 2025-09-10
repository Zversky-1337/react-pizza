import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchOrders } from "../../redux/slices/orderHistorySlice";
import styles from "./OrderHistory.module.scss";
import { format } from "date-fns";

const OrderHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector(
    (state) => state.orderHistory,
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) return <p>Загрузка заказов...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!orders.length) return <p>Нет заказов</p>;

  const reverseOrders = [...orders].reverse();

  return (
    <div className={styles.orderHistoryContainer}>
      <h2>История заказов</h2>

      <table className={styles.orderTable}>
        <thead>
          <tr>
            <th>Время заказа</th>
            <th>Сумма</th>
            <th>Способ оплаты</th>
            <th>Чек</th>
          </tr>
        </thead>
        <tbody>
          {reverseOrders.map((order) => {
            const formattedTime = format(
              new Date(order.time),
              "yyyy-MM-dd HH:mm",
            );

            return (
              <tr key={order.id}>
                <td>{formattedTime}</td>
                <td>{order.amount} ₽</td>
                <td>{order.payment}</td>
                <td>
                  <button className={styles.receiptButton}>
                    {order.receipt}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
