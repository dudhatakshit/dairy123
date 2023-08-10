

// export default localStorageLock;


import React, { Component } from 'react'

export default class LocalStorageLock extends Component {
    localStorageLock = {
        lockKey: 'localStorageLocked',
        isLocked: false,

        lock() {
            this.isLocked = true;
            localStorage.setItem(this.lockKey, 'locked');
        },

        unlock() {
            this.isLocked = false;
            localStorage.removeItem(this.lockKey);
        },

        setItem(key, value) {
            if (!this.isLocked) {
                localStorage.setItem(key, value);
            }
        },

        getItem(key) {
            if (!this.isLocked) {
                return localStorage.getItem(key);
            }
            return null;
        },

        removeItem(key) {
            if (!this.isLocked) {
                localStorage.removeItem(key);
            }
        },
    };
    render() {
        return (
            <div>LocalStorageLock</div>
        )
    }
}
