import React, { useState } from 'react';
import { 
  BarChart3, 
  Calendar, 
  Store, 
  TrendingUp, 
  Users, 
  Menu, 
  X,
  ChevronDown,
  Activity,
  Target,
  FileText,
  PieChart,
  TrendingDown,
  UserPlus,
  UserMinus,
  Settings,ChevronLeft, Zap,GraduationCap ,Search,Bell
} from 'lucide-react';
import MoreVerticalMenu from './more-vertical-menu'

type MenuItemType = {
  id: string;
  icon: React.ElementType;
  label: string;
  subItems?: { id: string; label: string }[];
};

type MenuItemProps = {
  item: MenuItemType;
};

const StoreBuddyDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({});
  const [isMobile, setIsMobile] = useState(false);
  const [currentView, setCurrentView] = useState('list');
  const [selectedStaff, setSelectedStaff] = useState(null);

  const data = generateSampleData();
  const cumulativeSales = data[19].cumulativeSales;

  // ウィンドウサイズの監視
  // React.useEffect(() => {
  //   const checkScreenSize = () => {
  //     setIsMobile(window.innerWidth < 768);
  //   };
    
  //   checkScreenSize();
  //   window.addEventListener('resize', checkScreenSize);
    
  //   return () => window.removeEventListener('resize', checkScreenSize);
  // }, []);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const calendar = [
    {date: 5, content: ["会議"], battlePowerList: null},
    {date:11, content: ["会議"], battlePowerList: [{name:"新橋店", rank: "B"},{name:"新宿店", rank: "S"},{name:"品川店", rank: "D"},]},
    {date:12, content: ["会議"], battlePowerList: [{name:"新橋店", rank: "A"},{name:"新宿店", rank: "A"},{name:"品川店", rank: "C"},]},
    {date:13, content: [], battlePowerList: [{name:"新橋店", rank: "C"},{name:"新宿店", rank: "A"},{name:"品川店", rank: "C"},]},
    {date:14, content: [], battlePowerList: [{name:"新橋店", rank: "S"},{name:"新宿店", rank: "S"},{name:"品川店", rank: "D"},]},
    {date:15, content: [], battlePowerList: [{name:"新橋店", rank: "B"},{name:"新宿店", rank: "B"},{name:"品川店", rank: "B"},]},
    {date:16, content: [], battlePowerList: [{name:"新橋店", rank: "D"},{name:"新宿店", rank: "A"},{name:"品川店", rank: "D"},]},
    {date:17, content: [], battlePowerList: [{name:"新橋店", rank: "B"},{name:"新宿店", rank: "S"},{name:"品川店", rank: "C"},]},
    {date:25, content: ["会議"], battlePowerList: null},
  ]

  const menuItems = [
    {
      id: 'dashboard',
      icon: BarChart3,
      label: 'ダッシュボード',
      subItems: [
        { id: 'stats', label: '統計情報' },
        { id: 'performance', label: '各店舗実績' }
      ]
    },
    {
      id: 'calendar',
      icon: Calendar,
      label: 'カレンダー',
      subItems: [
        { id: 'google-calendar', label: 'Googleカレンダー予定表' },
        { id: 'sv-store-route-recommend-calendar', label: 'SV臨店ルートリコメンドシステム' },
      ]
    },
    {
      id: 'store-management',
      icon: Store,
      label: '店舗運営',
      subItems: [
        { id: 'idxxx', label: 'アナウンスシステム' },
        { id: 'qsc-rates', label: 'QSC履行率一覧' },
        { id: 'report-status', label: '各店舗QSC報告状況' }
      ]
    },
    {
      id: 'analytics',
      icon: TrendingUp,
      label: 'AI分析',
      subItems: [
        { id: 'sales-analysis', label: 'AI売上分析' },
        { id: 'competitor-analysis', label: '競合分析' },
        { id: 'customer-analysis', label: 'AI画像識別監視カメラ＋顧客分析' },
      ]
    },
    {
      id: 'education-management',
      icon: GraduationCap,
      label: '教育管理',
      subItems: [
        { id: 'talent-management', label: 'タレントマネジメント' },
        { id: 'education-plan', label: '教育計画' }
      ]
    },
    {
      id: 'organization',
      icon: Users,
      label: '組織管理',
      subItems: [
        { id: 'account-management', label: 'アカウント管理' },
        { id: 'user-operations', label: 'ユーザー操作' }
      ]
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
      case 'stats':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <SalesChart data={data}/>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">本日の店舗運営スコア</h3>
                
                {/* <div className="py-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800">達成見込み店舗</h3>
                    <p className="font-semibold  text-green-600">３店舗</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-red-800">未達見込み店舗</h3>
                    <p className="font-semibold  text-red-600">１店舗</p>
                  </div>
                </div> */}

                <div className="space-y-3">
                  {[
                    { name: '新宿店', battleScore: 3050, rate: "S" },
                    { name: '渋谷店', battleScore: 2650, rate: "A" },
                    { name: '新橋店', battleScore: 2200, rate: "B" },
                    { name: '池袋店', battleScore: 1400, rate: "C" },
                    { name: '品川店', battleScore: 620, rate: "D" }
                  ].map((store, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{store.name}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-20 bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div 
                            className={`h-full ${getBattlePowerColor(store.battleScore,3000)} transition-all duration-300`}
                            style={{ width: `${Math.min((store.battleScore / 3000) * 100, 100)}%` }}
                          />
                        </div>
                        <div className="flex items-center space-x-1 font-bold">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span>{store.battleScore.toLocaleString()}</span>
                        </div>
                      </div>
                      <RankDisplay rank={store.rate} size="sm" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">総売上</p>
                    <p className="text-2xl font-bold text-gray-900">¥{cumulativeSales.toLocaleString()}</p>
                    <p className="text-sm text-green-600">+12.5% 前月比</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">店舗数</p>
                    <p className="text-2xl font-bold text-gray-900">4店舗</p>
                    <p className="text-sm text-blue-600">全店舗稼働中</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <Store className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">平均QSC</p>
                    <p className="text-2xl font-bold text-gray-900">87.5%</p>
                    <p className="text-sm text-green-600">+2.1% 前週比</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">未習得ユーザー</p>
                    <p className="text-2xl font-bold text-gray-900">24人</p>
                    <p className="text-sm text-gray-500">今日のログイン</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <Activity className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div> */}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">教育管理</h3>
                <div className="space-y-3">
                  {/* <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-red-900">品川店 - 売上目標未達成</p>
                      <p className="text-sm text-red-700">目標の85%に留まっています</p>
                    </div>
                  </div> */}
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-yellow-900 text-left">スキル承認</p>
                      <p className="text-sm text-yellow-700">本日の報告がまだ提出されていません</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-blue-900 text-left">教育計画</p>
                      <p className="text-sm text-blue-700">来月の教育計画の作成</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">今日のアラート</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-red-900">品川店 - 売上目標未達成</p>
                      <p className="text-sm text-red-700">目標の85%に留まっています</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-yellow-900">池袋店 - QSC報告未提出</p>
                      <p className="text-sm text-yellow-700">本日の報告がまだ提出されていません</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-blue-900">新宿店 - 売上好調</p>
                      <p className="text-sm text-blue-700">目標を15%上回っています</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'calendar':
      case 'google-calendar':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Googleカレンダー予定表</h2>
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
                <div key={day} className="p-3 text-center font-medium text-gray-700 bg-gray-50 rounded">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }, (_, i) => {
                const date = i - 3;
                const isToday = date === 7;
                const hasEvent = [5, 12, 18, 25].includes(date);
                const event = calendar.find(item => item.date === date);
                return (
                  <div
                    key={i}
                    className={`p-3 h-40 border rounded ${
                      date < 1 || date > 30 
                        ? 'bg-gray-50 text-gray-300' 
                        : isToday 
                        ? 'bg-blue-100 border-blue-300' 
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-sm font-medium">{date > 0 && date <= 30 ? date : ''}</div>
                    {
                      event?.battlePowerList && event.battlePowerList.length > 0 && (
                        <div className="mt-2 mb-2 border border-yellow-300 rounded p-1 bg-yellow-50 shadow-sm">
                          {event.battlePowerList.map(bp =>
                            <div className={`text-xs font-medium ${bp.rank === 'C' || bp.rank === 'D'?'bg-red-500' :'bg-green-500'} 
                              text-white px-1 py-0.5 rounded mt-1`} key={bp.name}>
                              {bp.name}：{bp.rank}
                            </div>
                          )}
                        </div>
                      )
                    }
                    {
                      event?.content.map(cont=>
                        <div className="text-xs bg-blue-500 text-white px-1 py-0.5 rounded mt-1">
                          {cont}
                        </div>
                      )
                    }
                  </div>
                );
              })}
            </div>
          </div>
        );
        
      case 'store-management':
      case 'qsc-rates':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">QSC履行率一覧</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">店舗名</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Quality</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Service</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Cleanliness</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">総合評価</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">最終更新</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: '新宿店', q: 92, s: 89, c: 95, total: 92, updated: '2時間前' },
                      { name: '渋谷店', q: 88, s: 91, c: 87, total: 89, updated: '1時間前' },
                      { name: '池袋店', q: 85, s: 82, c: 88, total: 85, updated: '4時間前' },
                      { name: '品川店', q: 78, s: 85, c: 82, total: 82, updated: '30分前' }
                    ].map((store, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{store.name}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            store.q >= 90 ? 'bg-green-100 text-green-800' : 
                            store.q >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {store.q}%
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            store.s >= 90 ? 'bg-green-100 text-green-800' : 
                            store.s >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {store.s}%
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            store.c >= 90 ? 'bg-green-100 text-green-800' : 
                            store.c >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {store.c}%
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            store.total >= 90 ? 'bg-green-100 text-green-800' : 
                            store.total >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {store.total}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{store.updated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
        
      case 'analytics':
      case 'sales-analysis':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">売上分析</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="text-2xl font-bold text-gray-900">¥12.4M</span>
                </div>
                <p className="text-sm text-green-600">前月比 +12.5%</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">出数分析</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <PieChart className="h-5 w-5 text-blue-600" />
                  <span className="text-2xl font-bold text-gray-900">15,240</span>
                </div>
                <p className="text-sm text-blue-600">前月比 +8.3%</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">競合分析</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingDown className="h-5 w-5 text-purple-600" />
                  <span className="text-2xl font-bold text-gray-900">市場シェア</span>
                </div>
                <p className="text-sm text-purple-600">23.5% (+1.2%)</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">月別売上推移</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">チャートがここに表示されます</p>
              </div>
            </div>
          </div>
        );
        
      case 'organization':
      case 'account-management':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">アカウント管理</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                  <UserPlus className="h-4 w-4" />
                  <span>新規ユーザー追加</span>
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">ユーザー名</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">メール</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">役職</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">担当店舗</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">最終ログイン</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">アクション</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: '田中太郎', email: 'tanaka@example.com', role: 'エリアマネージャー', store: '新宿店・渋谷店', login: '2時間前' },
                      { name: '佐藤花子', email: 'sato@example.com', role: '店長', store: '池袋店', login: '1日前' },
                      { name: '鈴木一郎', email: 'suzuki@example.com', role: 'スタッフ', store: '品川店', login: '3時間前' },
                      { name: '山田美咲', email: 'yamada@example.com', role: '店長', store: '新宿店', login: '30分前' }
                    ].map((user, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{user.name}</td>
                        <td className="py-3 px-4 text-gray-600">{user.email}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === 'エリアマネージャー' ? 'bg-purple-100 text-purple-800' :
                            user.role === '店長' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{user.store}</td>
                        <td className="py-3 px-4 text-gray-600">{user.login}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <Settings className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                              <UserMinus className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'talent-management':
        return <TalentManagement />;
      case 'education-plan':
        return <StaffManagement />;
        
      default:
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{menuItems.find(item => item.id === activeTab)?.label}</h2>
            <p className="text-gray-600">この機能は開発中です。</p>
          </div>
        );
    }
  };

  const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
    const Icon = item.icon;
    const isExpanded = expandedMenus[item.id];
    const hasActiveSubItem = item.subItems?.some(subItem => subItem.id === activeTab);
    
    return (
      <div className="mb-1">
        <button
          onClick={() => {
            if (item.subItems) {
              toggleMenu(item.id);
            } else {
              setActiveTab(item.id);
              // モバイル表示時はサイドバーを閉じる
              if (isMobile) {
                setSidebarOpen(false);
              }
            }
          }}
          className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${
            activeTab === item.id || hasActiveSubItem
              ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </div>
          {item.subItems && (
            <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          )}
        </button>
        
        {item.subItems && isExpanded && (
          <div className="mt-1 ml-4 space-y-1">
            {item.subItems.map((subItem) => (
              <button
                key={subItem.id}
                onClick={() => {
                  setActiveTab(subItem.id);
                  // モバイル表示時はサイドバーを閉じる
                  if (isMobile) {
                    setSidebarOpen(false);
                  }
                }}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === subItem.id
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {subItem.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h2 className="sm:text-xl font-bold text-gray-900">STORE BUDDY for food　【SV】</h2>
            </div>
            {/* <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">管</span>
                </div>
                <span className="text-sm font-medium text-gray-700">管理者</span>
              </div>
            </div> */}
            <MoreVerticalMenu />
          </div>
        </div>
      </header>

        {/* Sidebar */}
        <aside id="sidebar" className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 lg:z-30`}>
          <div className="pt-20 p-6">
            <div className="flex justify-between items-center mb-6 md:hidden">
              <h2 className="text-lg font-semibold text-gray-900">メニュー</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </nav>
          </div>
        {/* </div> */}
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-gray-50/75 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="md:p-4">
          <main className="pt-16 lg:pl-64 min-h-screen">
            {renderContent()}
          </main>
        </div>
    </div>
  );
};

export default StoreBuddyDashboard;

const getBattlePowerColor = (power: number, max: number) => {
  const powerRatio: number = (power / max) * 100;
  if (powerRatio <= 20) return 'bg-red-500';
  if (powerRatio <= 60) return 'bg-orange-500';
  if (powerRatio < 100) return 'bg-yellow-500';
  return 'bg-green-500';
};

const StaffManagement = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedStaff, setSelectedStaff] = useState(null);

  // スタッフデータ
  const staffData = [
    {
      id: 1,
      name: '田中太郎',
      store: '新宿店',
      joinDate: '2023-04-01',
      sumBattlePower: 350,
      details: [
        { majorCategory: 'ホール',  minorCategory: 'オーダー', status: '習得', schedule: '2025-06-15', battlePower: 100 },
        { majorCategory: '',  minorCategory: 'バッシング', status: 'トレーニング中', schedule: '2025-06-15', battlePower: 45 },
        { majorCategory: '',  minorCategory: '案内', status: '未習得', schedule: '2025-06-15', battlePower: 20 },
        { majorCategory: '',  minorCategory: '会計', status: '習得', schedule: '2025-06-15', battlePower: 100 },
        { majorCategory: '',  minorCategory: '中締め', status: 'トレーニング中', schedule: '2025-06-15', battlePower: 85 },
        { majorCategory: 'キッチン', minorCategory: '冷菜・温菜', status: '', schedule: '2025-06-20', battlePower: 0 },
        { majorCategory: '', minorCategory: '焼き場', status: '', schedule: '2025-06-20', battlePower: 0 },
        { majorCategory: '', minorCategory: 'あおり場', status: '', schedule: '2025-06-20', battlePower: 0 },
        { majorCategory: '', minorCategory: '揚場', status: '', schedule: '2025-06-20', battlePower: 0 },
        { majorCategory: '', minorCategory: '刺し場', status: '', schedule: '2025-06-20', battlePower: 0 },
        { majorCategory: '', minorCategory: '麺あげ', status: '', schedule: '2025-06-20', battlePower: 0 },
        { majorCategory: 'リテール', minorCategory: '品出し', status: '', schedule: '2025-05-30', battlePower: 0 },
        { majorCategory: '', minorCategory: 'レジ', status: '', schedule: '2025-05-30', battlePower: 0 },
        { majorCategory: '', minorCategory: '惣菜', status: '', schedule: '2025-05-30', battlePower: 0 },
        { majorCategory: '', minorCategory: '生鮮', status: '', schedule: '2025-05-30', battlePower: 0 },
      ]
    },
    {
      id: 2,
      name: '佐藤花子',
      store: '渋谷店',
      joinDate: '2022-09-15',
      sumBattlePower: 200,
      details: [
      ]
    },
    {
      id: 3,
      name: '山田次郎',
      store: '池袋店',
      joinDate: '2021-11-20',
      sumBattlePower: 120,
      details: [
      ]
    },
  ];

  const handleStaffClick = (staff) => {
    setSelectedStaff(staff);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedStaff(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };


  const getMinorCategoryColor = (status) => {
    const colors = {
      'オーダー': 'bg-green-100 text-green-800',
      'バッシング': 'bg-blue-100 text-blue-800',
      '案内': 'bg-gray-100 text-gray-800',
      '会計': 'bg-yellow-100 text-yellow-800',
      '中締め': 'bg-purple-100 text-purple-800',
      '冷菜・温菜': 'bg-green-100 text-green-800',
      '焼き場': 'bg-blue-100 text-blue-800',
      'あおり場': 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };
  const getStatusColor = (status) => {
    const colors = {
      '未習得': 'bg-green-100 text-green-800',
      'トレーニング中': 'bg-blue-100 text-blue-800',
      '待機中': 'bg-gray-100 text-gray-800',
      'レビュー中': 'bg-yellow-100 text-yellow-800',
      '習得': 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // const BattlePowerGauge = ({ power }) => {
  //   const percentage = Math.min((power / 10000) * 100, 100);
  //   const colorClass = getBattlePowerColor(power,10000);
    
  //   return (
  //     <div className="flex items-center space-x-3">
  //       <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
  //         <div 
  //           className={`h-full ${colorClass} transition-all duration-500 ease-out rounded-full`}
  //           style={{ width: `${percentage}%` }}
  //         />
  //       </div>
  //       <div className="flex items-center space-x-1 font-bold text-lg">
  //         <Zap className="w-5 h-5 text-yellow-500" />
  //         <span>{power.toLocaleString()}</span>
  //       </div>
  //     </div>
  //   );
  // };

  if (currentView === 'detail' && selectedStaff) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={handleBackToList}
            className="flex items-center space-x-2 mb-6 px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>一覧に戻る</span>
          </button>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white">
              <h1 className="text-3xl font-bold mb-2">{selectedStaff.name}</h1>
              <p className="text-blue-100 text-lg">{selectedStaff.store} | 入社日: {formatDate(selectedStaff.joinDate)}</p>
            </div>

            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">詳細情報</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900">ポジション</th>
                      {/* <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900">詳細</th> */}
                      <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900">業務</th>
                      <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900">初業務日</th>
                      <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900">ステータス</th>
                      <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900">戦闘力</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStaff.details.map((detail, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-300 px-4 py-3 text-sm text-gray-900">
                          {detail.majorCategory}
                        </td>
                        <td className="border border-gray-300 px-4 py-3">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getMinorCategoryColor(detail.minorCategory)}`}>
                            {detail.minorCategory}
                          </span>
                        </td>
                        <td className="border border-gray-300 px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-900">{formatDate(detail.schedule)}</span>
                          </div>
                        </td>
                        <td className="border border-gray-300 px-4 py-3">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(detail.status)}`}>
                            {detail.status}
                          </span>
                        </td>
                        <td className="border border-gray-300 px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-full ${getBattlePowerColor(detail.battlePower,100)} transition-all duration-300`}
                                style={{ width: `${Math.min((detail.battlePower / 100) * 100, 100)}%` }}
                              />
                            </div>
                            <div className="flex items-center space-x-1 text-sm font-semibold">
                              <Zap className="w-3 h-3 text-yellow-500" />
                              <span>{detail.battlePower.toLocaleString()}</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">スタッフ管理システム</h2>
          <p className="text-gray-600">スタッフ一覧とパフォーマンス管理</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">スタッフ名</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">所属店舗</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">入社日</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">総戦闘力</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {staffData.map((staff, index) => (
                  <tr 
                    key={staff.id} 
                    className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleStaffClick(staff)}
                        className="text-blue-600 hover:text-blue-800 font-semibold text-lg hover:underline transition-colors"
                      >
                        {staff.name}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-gray-900 text-base">{staff.store}</td>
                    <td className="px-6 py-4 text-gray-900 text-base">{formatDate(staff.joinDate)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-20 bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div 
                            className={`h-full ${getBattlePowerColor(staff.sumBattlePower,500)} transition-all duration-300`}
                            style={{ width: `${Math.min((staff.sumBattlePower / 500) * 100, 100)}%` }}
                          />
                        </div>
                        <div className="flex items-center space-x-1 font-bold">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span>{staff.sumBattlePower.toLocaleString()}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          {staffData.length}名のスタッフが登録されています
        </div>
      </div>
    </div>
  );
};


const TalentManagement = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedStaff, setSelectedStaff] = useState(null);

  // スタッフデータ
  const areaStaffData = [
    {id:1,name:"市川理貴", position:"店長",affiliatedStore:"東野店",acquiredSkills:["QSC","キッチン","ホール","管理"],score:94,inStoreSupportRate:"良好",futureImage:["SV","部長"],},
    {id:2,name:"和田渓扶", position:"社員",affiliatedStore:"東野店",acquiredSkills:["キッチン","ホール"],score:78,inStoreSupportRate:"良好",futureImage:["SV","店長"],},
    {id:3,name:"藤田道彦", position:"P/A",affiliatedStore:"東野店",acquiredSkills:["キッチン"],score:12,inStoreSupportRate:"普通",futureImage:["P/A"],},
    {id:4,name:"船津雄太", position:"店長",affiliatedStore:"舞浜店",acquiredSkills:["QSC","ホール","管理"],score:43,inStoreSupportRate:"課題あり",futureImage:["P/A"],},
    {id:5,name:"船津優菜", position:"社員",affiliatedStore:"舞浜店",acquiredSkills:["QSC","キッチン"],score:33,inStoreSupportRate:"課題あり",futureImage:["社員"],},
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getBattlePowerColor = (power: number, max: number) => {
    const powerRatio: number = (power / max) * 100;
    if (powerRatio <= 20) return 'bg-red-500';
    if (powerRatio <= 60) return 'bg-orange-500';
    if (powerRatio < 100) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getMinorCategoryColor = (status) => {
    const colors = {
      'オーダー': 'bg-green-100 text-green-800',
      'バッシング': 'bg-blue-100 text-blue-800',
      '案内': 'bg-gray-100 text-gray-800',
      '会計': 'bg-yellow-100 text-yellow-800',
      '中締め': 'bg-purple-100 text-purple-800',
      '冷菜・温菜': 'bg-green-100 text-green-800',
      '焼き場': 'bg-blue-100 text-blue-800',
      'あおり場': 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };
  const getStatusColor = (status) => {
    const colors = {
      '未習得': 'bg-green-100 text-green-800',
      'トレーニング中': 'bg-blue-100 text-blue-800',
      '待機中': 'bg-gray-100 text-gray-800',
      'レビュー中': 'bg-yellow-100 text-yellow-800',
      '習得': 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">SVエリアスタッフ表</h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">名前</th>
                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">職位</th>
                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">所属店舗</th>
                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">習得スキル</th>
                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">スコア</th>
                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">店舗内支持率</th>
                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">将来像</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {areaStaffData.map((staff, index) => (
                  <tr 
                    key={staff.id} 
                    className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    <td className="px-6 py-4 text-gray-900 text-left">
                        {staff.name}
                    </td>
                    <td className="px-6 py-4 text-gray-900 px-4 py-3">
                      <AutoColorChip text={staff.position} size="sm" />
                    </td>
                    <td className="px-6 py-4 text-gray-900 px-4 py-3">
                      <AutoColorChip text={staff.affiliatedStore} size="sm" />
                    </td>
                    <td className="px-6 py-4 text-gray-900 px-4 py-3">
                      {staff.acquiredSkills.map((item) => (
                        <AutoColorChip text={item} size="sm" />
                      ))}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-20 bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div 
                            className={`h-full ${getBattlePowerColor(staff.score,500)} transition-all duration-300`}
                            style={{ width: `${Math.min((staff.score / 500) * 100, 100)}%` }}
                          />
                        </div>
                        <div className="flex items-center space-x-1 font-bold">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span>{staff.score.toLocaleString()}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900 px-4 py-3">
                      <AutoColorChip text={staff.inStoreSupportRate} size="sm" />
                    </td>
                    <td className="px-6 py-4 text-gray-900 px-4 py-3">
                      {staff.futureImage.map((item) => (
                        <AutoColorChip text={item} size="sm" />
                      ))}
                    </td>
                    {/* <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-20 bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div 
                            className={`h-full ${getBattlePowerColor(staff.sumBattlePower,500)} transition-all duration-300`}
                            style={{ width: `${Math.min((staff.sumBattlePower / 500) * 100, 100)}%` }}
                          />
                        </div>
                        <div className="flex items-center space-x-1 font-bold">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span>{staff.sumBattlePower.toLocaleString()}</span>
                        </div>
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          {areaStaffData.length}名のスタッフが登録されています
        </div>
      </div>
    </div>
  );
};


const AutoColorChip = ({ text, size = 'md' }) => {
  // 文字列から色を生成する関数
  const generateColor = (str) => {
    // 文字列をハッシュ化
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 32bit整数に変換
    }
    
    // Tailwindの色パレット（明るめの色を選択）
    const colors = [
      { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
      { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
      { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
      { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
      { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
      { bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-200' },
      { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-200' },
      { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' },
      { bg: 'bg-teal-100', text: 'text-teal-800', border: 'border-teal-200' },
      { bg: 'bg-cyan-100', text: 'text-cyan-800', border: 'border-cyan-200' },
      { bg: 'bg-lime-100', text: 'text-lime-800', border: 'border-lime-200' },
      { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200' },
      { bg: 'bg-sky-100', text: 'text-sky-800', border: 'border-sky-200' },
      { bg: 'bg-violet-100', text: 'text-violet-800', border: 'border-violet-200' },
      { bg: 'bg-rose-100', text: 'text-rose-800', border: 'border-rose-200' },
      { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200' }
    ];
    
    // ハッシュ値から色のインデックスを決定
    const colorIndex = Math.abs(hash) % colors.length;
    return colors[colorIndex];
  };

  // サイズのクラス定義
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const color = generateColor(text);
  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <span
      className={`
        inline-flex items-center rounded-full border
        ${color.bg} ${color.text} ${color.border}
        ${sizeClass}
        font-medium transition-all duration-200
        hover:shadow-sm
      `}
    >
      {text}
    </span>
  );
};

import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';

  // 6月のサンプルデータ（月初から連続して20日分のデータを用意）
const generateSampleData = () => {
    const allDays = [];
    let cumulativeSales:number = 0;
    
    // 全30日分の枠を作成
    for (let day = 1; day <= 30; day++) {
      let dailySales:number|null = null;
      let currentCumulative:number|null = null;
      
      // 月初から20日分のみデータを設定
      if (day <= 20) {
        const dayOfWeek = new Date(2024, 5, day).getDay(); // 0=日曜日, 6=土曜日
        const baseAmount = dayOfWeek === 0 || dayOfWeek === 6 ? 80000 : 120000;
        const variation = Math.random() * 60000 - 30000;
        dailySales = Math.max(0, baseAmount + variation);
        dailySales = Math.round(dailySales);
        
        cumulativeSales += dailySales;
        currentCumulative = cumulativeSales;
      }
      
      allDays.push({
        day: day,
        date: `6/${day}`,
        dailySales: dailySales,
        cumulativeSales: currentCumulative
      });
    }
    
    return allDays;
  };

const SalesChart = ({data}) => {

  
  // 目標ライン：月末までに300万円
  const targetAmount = 3000000;
  
  // 損益分岐ライン：月末までに200万円
  const breakEvenAmount = 2000000;

  const formatCurrency = (value) => {
    return `¥${(value / 10000).toFixed(0)}万`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="font-semibold">{`6月${label}日`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          6月 売上実績チャート
        </h2>
        
        <div className="h-75">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="date" 
                stroke="#666"
                fontSize={12}
                interval={4}
                domain={[0, 30]}
              />
              <YAxis 
                stroke="#666"
                fontSize={12}
                tickFormatter={formatCurrency}
                domain={[0, 4000000]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              {/* 目標ライン（実線） */}
              <ReferenceLine 
                y={targetAmount} 
                stroke="#ff6b6b" 
                strokeWidth={2}
                label={{ value: "目標ライン", position: "topLeft" }}
              />
              
              {/* 損益分岐ライン（点線） */}
              <ReferenceLine 
                y={breakEvenAmount} 
                stroke="#ffa500" 
                strokeWidth={2}
                strokeDasharray="8 8"
                label={{ value: "損益分岐", position: "topLeft" }}
              />
              
              {/* 日別売上（棒グラフ） */}
              <Bar 
                dataKey="dailySales" 
                fill="#4a90e2" 
                name="日別売上"
                opacity={0.7}
              />
              
              {/* 累積売上（線グラフ） */}
              <Line 
                type="monotone" 
                dataKey="cumulativeSales" 
                stroke="#2ecc71" 
                strokeWidth={3}
                name="累積売上"
                dot={{ fill: "#2ecc71", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800">月累計売上</h3>
            <p className="text-2xl font-bold text-blue-600">
              {formatCurrency(data[19].cumulativeSales)}
            </p>
            <p className="text-sm text-green-600">+12.5% 前月比</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-semibold text-red-800">月間目標</h3>
            <p className="text-2xl font-bold text-red-600">
              {formatCurrency(targetAmount)}
            </p>
          </div>
        </div>
        
        {/* <div className="mt-4 text-sm text-gray-600">
          <p>※ このチャートはサンプルデータを使用しています。実際のデータに置き換えてご利用ください。</p>
        </div> */}
      </div>
  );
};

const RankDisplay = ({ rank = 'S', showLabel = true, size = 'md' }) => {
  const rankStyles = {
    S: {
      rank: 'S',
      label: 'SUPREME',
      gradient: 'from-yellow-400 via-yellow-500 to-orange-500',
      shadow: 'shadow-yellow-500/30',
      hoverShadow: 'hover:shadow-yellow-500/50'
    },
    A: {
      rank: 'A',
      label: 'EXCELLENT',
      gradient: 'from-gray-300 via-gray-400 to-gray-500',
      shadow: 'shadow-gray-500/30',
      hoverShadow: 'hover:shadow-gray-500/50'
    },
    B: {
      rank: 'B',
      label: 'GOOD',
      gradient: 'from-amber-600 via-yellow-700 to-orange-800',
      shadow: 'shadow-amber-600/30',
      hoverShadow: 'hover:shadow-amber-600/50'
    },
    C: {
      rank: 'C',
      label: 'AVERAGE',
      gradient: 'from-blue-500 via-blue-600 to-blue-700',
      shadow: 'shadow-blue-500/30',
      hoverShadow: 'hover:shadow-blue-500/50'
    },
    D: {
      rank: 'D',
      label: 'NEEDS WORK',
      gradient: 'from-red-600 via-red-700 to-red-800',
      shadow: 'shadow-red-600/30',
      hoverShadow: 'hover:shadow-red-600/50'
    }
  };

  const sizeClasses = {
    sm: {
      container: 'w-10 h-10',
      text: 'text-xl',
      label: 'text-xs -bottom-6'
    },
    md: {
      container: 'w-24 h-24 md:w-32 md:h-32',
      text: 'text-3xl md:text-4xl',
      label: 'text-xs md:text-sm -bottom-8'
    },
    lg: {
      container: 'w-32 h-32 md:w-40 md:h-40',
      text: 'text-4xl md:text-5xl',
      label: 'text-sm md:text-base -bottom-10'
    }
  };

  const currentRank = rankStyles[rank.toUpperCase()] || rankStyles.D;
  const currentSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className="inline-block">
      <div
        className={`
          relative ${currentSize.container}
          bg-gradient-to-br ${currentRank.gradient}
          rounded-2xl flex items-center justify-center
          text-white ${currentSize.text} font-bold
          shadow-2xl ${currentRank.shadow}
          transform transition-all duration-300 ease-out
          hover:-translate-y-2 hover:scale-105 ${currentRank.hoverShadow}
          cursor-pointer group
        `}
        style={{
          boxShadow: `0 8px 32px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.1) inset`
        }}
      >
        {/* 光沢エフェクト */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* ランク文字 */}
        <span className="relative z-10 drop-shadow-md">
          {currentRank.rank}
        </span>
        
        {/* ラベル */}
        {/* {showLabel && (
          <div className={`absolute ${currentSize.label} left-1/2 transform -translate-x-1/2 text-white font-semibold opacity-80 whitespace-nowrap`}>
            {currentRank.label}
          </div>
        )} */}
      </div>
    </div>
  );
};
