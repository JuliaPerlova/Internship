import { Connection } from 'mongoose';
import { ScheduleSchema } from './schemas/schedule.schema';

export const scheduleProviders = [
  {
    provide: 'SCHEDULE_MODEL',
    useFactory: (connection: Connection) => connection.model('Schedule', ScheduleSchema),
    inject: ['DATABASE_SCHEDULE_CONNECTION'],
  },
]