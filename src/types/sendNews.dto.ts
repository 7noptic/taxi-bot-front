import { NewsletterType } from 'src/types/newsletter.type';

export interface SendNewsDto {
  type: NewsletterType | string;
  message: string;
}
