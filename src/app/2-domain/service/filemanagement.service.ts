import { Injectable } from '@angular/core';
import { IFileManagementService } from '../service-contract/filemanagement.service.contract';

@Injectable({
  providedIn: 'root'
})
export class FileManagementService extends IFileManagementService {

  constructor(

  ) { super() }
}
