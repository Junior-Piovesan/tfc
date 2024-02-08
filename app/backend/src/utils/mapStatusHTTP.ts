type StatusType =
'SUCCESSFUL' |
'CREATED' |
'INVALID_DATA' |
'NOT_FOUND' |
'CONFLICT' |
'UNAUTHORIZED' |
'UNPROCESSABLE_CONTENT';

export default function mapStatusHTTP(status: StatusType) {
  switch (status) {
    case 'SUCCESSFUL': return 200;
    case 'CREATED': return 201;
    case 'INVALID_DATA': return 400;
    case 'NOT_FOUND': return 404;
    case 'CONFLICT': return 409;
    case 'UNAUTHORIZED': return 401;
    case 'UNPROCESSABLE_CONTENT': return 422;
    default: return 500;
  }
}
