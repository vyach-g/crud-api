import { UserDTO } from '../types/user';
import { httpRequest } from '../types/http';

export function isUUID(str: string) {
  const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return pattern.test(str);
}

export function getSplittedPath(path: string) {
  return path.split('/').filter((part) => part !== '');
}

export function getReqData(req: httpRequest): Promise<string | Error> {
  return new Promise((resolve, reject) => {
    try {
      let data = '';
      req.on('data', (chunk) => {
        data += chunk.toString();
      });
      req.on('end', () => {
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function isUserDataValid(data: UserDTO) {
  const isUsernameValid = data.username && typeof data.username === 'string';
  const isAgeValid = data.age && typeof data.age === 'number';
  const isHobbiesValid =
    data.hobbies &&
    Array.isArray(data.hobbies) &&
    data.hobbies.reduce((acc, hobbie) => acc && typeof hobbie === 'string', true);

  return isUsernameValid && isAgeValid && isHobbiesValid;
}
