import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const TranscriptModal = ({ transcript, name, archiveId }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sm text-archive-olive hover:text-archive-gold transition-fast border border-archive-olive hover:border-archive-gold px-4 py-2 mt-4">
          Read Transcript →
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-archive-paper">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-archive-text">
            {name} — {archiveId}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-6 space-y-4">
          <div className="prose prose-archive max-w-none">
            {transcript.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-base text-archive-text/90 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TranscriptModal;
