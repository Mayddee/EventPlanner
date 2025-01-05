import mongoose from 'mongoose';
import User from './User.js'; // Убедитесь, что путь к модели корректный

async function migrate() {
    try {
        // Подключение к базе данных
        await mongoose.connect('mongodb://localhost:27017/auth-db', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Обновление всех пользователей, добавление нового поля
        const result = await User.updateMany(
            {}, // Это выбирает всех пользователей
            { $set: { events: [] } } // Устанавливает пустой массив для поля `events`
        );
        console.log('Migration complete:', result);
        mongoose.disconnect(); // Закрыть соединение после завершения
    } catch (error) {
        console.error('Migration failed:', error);
    }
}

migrate();