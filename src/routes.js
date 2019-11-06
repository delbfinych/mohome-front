import Home from './views/home';
import {
  MainPhotoView,
  AddPhotos,
  PhotoAlbum,
  EditPhotoAlbum,
  SinglePhoto,
  PhotoSlider
} from './views/photo';
import Video from './views/video';
import { MainMusicView, MusicPlaylist, EditMusicPlaylist } from './views/music';

import SignIn from './views/sign-in';
import SignUp from './views/sign-up';

export default {
  root: {
    path: '/',
    view: Home
  },
  signIn: { path: '/sign-in', view: SignIn },
  signUp: { path: '/sign-up', view: SignUp },
  app: {
    photo: {
      main: {
        path: '/albums/',
        view: MainPhotoView
      },
      albums: {
        edit: {
          path: '/albums/:id/edit',
          view: EditPhotoAlbum
        },
        photo: {
          path: '/albums/:albumId/photo/:name',
          view: SinglePhoto
        },
        upload: {
          path: '/albums/:albumId/upload',
          view: AddPhotos
        },
        album: {
          path: '/albums/:albumId',
          view: PhotoAlbum
        }
      },
      slider: {
        path: 'photo/:name',
        view: PhotoSlider
      },
      photo: {
        path: '/albums/photo/:name',
        view: SinglePhoto
      },
      upload: {
        path: '/albums/upload',
        view: AddPhotos
      }
    },
    music: {
      main: {
        path: '/music',
        view: MainMusicView
      }
    },
    video: {
      main: {
        path: '/video',
        view: Video
      }
    }
  }
};
