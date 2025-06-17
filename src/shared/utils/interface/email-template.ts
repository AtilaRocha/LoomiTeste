export interface EmailTemplateParams {
  to_name: string;
  to_email: string;
  message: string;
  [key: string]: unknown;
}
