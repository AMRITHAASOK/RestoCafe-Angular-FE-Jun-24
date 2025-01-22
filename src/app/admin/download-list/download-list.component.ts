import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-download-list',
  templateUrl: './download-list.component.html',
  styleUrl: './download-list.component.css'
})
export class DownloadListComponent {
    
        downloadList:any=[]
    
          constructor(private api:ApiService){}
    
      ngOnInit(): void {
        this.getAllDownloads()
      }
    
          getAllDownloads(){
            this.api.getAllDownloadsAPI().subscribe((res:any)=>{
              console.log(res);
              this.downloadList=res
            })
          }
        
}
