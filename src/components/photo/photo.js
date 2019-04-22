import React, { Component } from 'react';
import './photo.css';

export default class Photo extends Component {
    render() {
        return (
            <div className="photo-section-container container">
                <div className="albums-container">
                    <div className="albums-bar  left-right-bar">
                        <div className="albums-bar-left">
                            <div className="albums-title">
                                My albums <span className="albums-count">0</span>
                            </div>
                        </div>
                        <div className="albums-bar-right">
                            <div className="add-album-button">
                                <i className="zmdi zmdi-collection-folder-image zmdi-hc-lg"></i> Add new album
                            </div>
                            <div className="add-photos-button">
                                <i className="zmdi zmdi-camera-add zmdi-hc-lg"></i> Add photos
                            </div>
                        </div>
                    </div>
                    <div className="albums-panel panel">
                    </div>
                </div>

                <div className="added-photos-container">
                    <div className="added-photos-bar left-right-bar">
                        <div className="added-photos-bar-left">
                            <div className="added-photos-title">
                                Added photos
                            </div>
                        </div>
                    </div>
                    <div className="added-photos-panel panel">
                    </div>
                </div>
            </div>
        );
    }
}
