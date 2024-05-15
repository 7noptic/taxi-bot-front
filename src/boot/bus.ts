import { EventBus } from 'quasar';
import { boot } from 'quasar/wrappers';
import { Appeal } from 'src/types/appeal.interface';

export default boot(({ app }) => {
  const bus = new EventBus<{ 'update-appeal': (appeal: Appeal) => void }>();
  app.provide('bus', bus);
});
