import React from 'react'

function Footer() {
  return (
    <footer className="absolute bottom-0">
      <div>
        &copy; {new Date().getFullYear()} 세상의 모든 리뷰
      </div>
    </footer>
  );
}

export default Footer