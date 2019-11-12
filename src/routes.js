import Home from './pages/home';
import {
  MainPhotoView,
  AddPhotos,
  PhotoAlbum,
  EditPhotoAlbum,
  SinglePhoto,
  PhotoSlider,
} from './pages/photo';
import Video from './pages/video';
import { MainMusicView, MusicPlaylist, EditMusicPlaylist } from './pages/music';

import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';

export default {
  root: {
    path: '/',
    view: Home,
  },
  signIn: { path: '/sign-in', view: SignIn },
  signUp: { path: '/sign-up', view: SignUp },
  app: {
    photo: {
      main: {
        path: '/albums/',
        view: MainPhotoView,
      },
      albums: {
        edit: {
          path: '/albums/:id/edit',
          relativePath: 'edit',
          view: EditPhotoAlbum,
        },
        photo: {
          path: '/albums/:albumId/photo/:name',
          view: SinglePhoto,
        },
        upload: {
          path: '/albums/:albumId/upload',
          view: AddPhotos,
        },
        album: {
          path: '/albums/:albumId',
          view: PhotoAlbum,
        },
      },
      slider: {
        path: 'photo/:name',
        relativePath: 'photo',
        view: PhotoSlider,
      },
      photo: {
        path: '/albums/photo/:name',
        view: SinglePhoto,
      },
      upload: {
        path: '/albums/upload',
        relativePath: 'upload',
        view: AddPhotos,
      },
    },
    music: {
      main: {
        path: '/music',
        view: MainMusicView,
      },
    },
    video: {
      main: {
        path: '/video',
        view: Video,
      },
    },
  },
};
