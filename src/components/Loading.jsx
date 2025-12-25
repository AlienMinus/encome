import React from 'react';

const Loading = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <>
      <div className="modal-backdrop fade show" style={{ zIndex: 1050 }}></div>
      <div className="modal fade show" style={{ display: 'block', zIndex: 1051 }} aria-modal="true" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center d-flex flex-column align-items-center justify-content-center">
              <div className="spinner-border text-danger" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 mb-0">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
