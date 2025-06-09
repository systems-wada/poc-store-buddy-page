import React, { useState, useEffect, useRef } from 'react';
import { Bell, Settings, User, MoreVertical, X,ChevronDown,Search } from 'lucide-react';

const MoreVerticalMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef(null);

  // 画面サイズの監視
  // useEffect(() => {
  //   const checkScreenSize = () => {
  //     setIsMobile(window.innerWidth < 640); // sm breakpoint
  //   };

  //   checkScreenSize();
  //   window.addEventListener('resize', checkScreenSize);
  //   return () => window.removeEventListener('resize', checkScreenSize);
  // }, []);

  // メニュー外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (item) => {
    // alert(`${item}がクリックされました`);
    setIsMenuOpen(false);
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="hidden md:flex items-center space-x-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="検索..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      {/* <div className="hidden sm:flex relative"> */}
        <button className="hidden sm:flex p-2 text-gray-500 hover:bg-gray-100 rounded-lg relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>
        <button className="hidden sm:flex p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
          <Settings className="w-5 h-5" />
        </button>
        <div className="hidden sm:flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">管</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      {/* </div> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* デスクトップメニュー */}
          {/* <div className="hidden sm:flex items-center space-x-4">
            <button
              onClick={() => handleMenuItemClick('通知')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <Bell size={20} />
            </button>
            <button
              onClick={() => handleMenuItemClick('設定')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <Settings size={20} />
            </button>
            <button
              onClick={() => handleMenuItemClick('アカウント情報')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <User size={20} />
            </button>
          </div> */}

          {/* モバイルメニューボタン */}
          <div className="sm:hidden relative" ref={menuRef}>
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <MoreVertical size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

            {/* オーバーレイメニュー */}
            {isMenuOpen && (
              <>
                {/* 背景オーバーレイ */}
                <div className="fixed inset-0 bg-black/50 z-40" />
                
                {/* メニューパネル */}
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* ヘッダー */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">メニュー</h3>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* メニューアイテム */}
                  <div className="py-2">
                    <button
                      onClick={() => handleMenuItemClick('通知')}
                      className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Bell size={20} className="mr-3 text-gray-500" />
                      <div>
                        <div className="font-medium">通知</div>
                        <div className="text-sm text-gray-500">新しいお知らせを確認</div>
                      </div>
                      <div className="ml-auto w-2 h-2 bg-red-500 rounded-full"></div>
                    </button>

                    <button
                      onClick={() => handleMenuItemClick('設定')}
                      className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Settings size={20} className="mr-3 text-gray-500" />
                      <div>
                        <div className="font-medium">設定</div>
                        <div className="text-sm text-gray-500">アプリの設定を変更</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleMenuItemClick('アカウント情報')}
                      className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <User size={20} className="mr-3 text-gray-500" />
                      <div>
                        <div className="font-medium">アカウント情報</div>
                        <div className="text-sm text-gray-500">プロフィールを表示・編集</div>
                      </div>
                    </button>
                  </div>

                  {/* フッター */}
                  <div className="border-t border-gray-200 p-4">
                    <div className="text-sm text-gray-500 text-center">
                      Version 1.0.0
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreVerticalMenu;
