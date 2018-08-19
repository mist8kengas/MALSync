import {pages} from "./pages";
import {pageInterface, pageState} from "./pageInterface";

export class syncPage{
  page: pageInterface;

  constructor(public url){
    this.page = this.getPage(url);
    if (this.page == null) {
      throw new Error('Page could not be recognized');
    }
    var tempThis = this;
    $(document).ready(function(){tempThis.handlePage()});
  }

  private getPage(url){
    for (var key in pages) {
      var page = pages[key];
      if( url.indexOf(utils.urlPart(page.domain, 2).split('.').slice(-2, -1)[0] +'.') > -1 ){
        return page;
      }
    }
    return null;
  }

  handlePage(){
    var state: pageState = {
      title: this.page.sync.getTitle(this.url),
      identifier: this.page.sync.getIdentifier(this.url)
    };

    if(this.page.isSyncPage(this.url)){
      state.episode = this.page.sync.getEpisode(this.url);
      if (typeof(this.page.sync.getVolume) != "undefined"){
        state.volume = this.page.sync.getVolume(this.url)
      }
      con.log('Sync', state);
    }
  }

}

